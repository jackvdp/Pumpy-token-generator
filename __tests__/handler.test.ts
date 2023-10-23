import { handler, getCacheTime, Token, ErrorResponse } from '../src/pages/api/token'
import jwt from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next'

describe('getCacheTime', () => {
    it('should return null for invalid token', () => {
        const token = 'invalid.token.here';
        expect(getCacheTime(token)).toBeNull();
    });

    it('should return null if exp claim is missing', () => {
        const token = jwt.sign({}, 'secret'); // No 'exp' claim
        expect(getCacheTime(token)).toBeNull();
    });

    it('should return the correct maxAge', () => {
        const exp = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
        const token = jwt.sign({ exp }, 'secret');
        expect(getCacheTime(token)).toBeCloseTo(3600, -2); // Allowing 2 seconds difference for potential delay
    });
});

describe('handler', () => {
    it('should return error if token is not found', () => {
        process.env.AM_TOKEN = undefined;

        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
            setHeader: jest.fn().mockReturnThis(),
        } as unknown as NextApiResponse<Token | ErrorResponse>;


        const mockReq = {
            headers: {},
            query: {},
            body: {},
            method: '',
            url: '',
        } as NextApiRequest;

        handler(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({ error: 'Invalid token format' });
    });

    it('should return a token if it is present', () => {
        const mockToken = jwt.sign({ exp: Math.floor(Date.now() / 1000) + 3600 }, 'secret');
        process.env.AM_TOKEN = mockToken; // Mocking the environment variable with the valid token

        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
            setHeader: jest.fn().mockReturnThis(),
        } as unknown as NextApiResponse<Token | ErrorResponse>;

        const mockReq = {
            headers: {},
            query: {},
            body: {},
            method: '',
            url: '',
        } as NextApiRequest;

        handler(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({ amToken: mockToken });
        expect(mockRes.setHeader).toHaveBeenCalledWith('Cache-Control', expect.any(String));
    });
});
