import { mockQueryBuild } from './query-builder.mock';

export const mockRepository = {
    find: jest.fn(),
    createQueryBuilder: jest.fn(() => mockQueryBuild),
    save: jest.fn(),
};
