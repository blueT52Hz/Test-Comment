import { Post, User } from '../types';

export const samplePosts: Post[] = [
  {
    id: '1',
    title: 'Giới thiệu về C++',
    content: '# C++ là gì?\n\nC++ là một ngôn ngữ lập trình...',
    summary: 'Bài viết giới thiệu tổng quan về ngôn ngữ lập trình C++',
    category: 'C++',
    author: 'John Doe',
    createdAt: '2023-06-01',
    thumbnail: 'https://example.com/cpp.jpg'
  },
  {
    id: '2',
    title: 'Lập trình hướng đối tượng trong Java',
    content: '# OOP trong Java\n\nJava là một ngôn ngữ lập trình hướng đối tượng...',
    summary: 'Tìm hiểu về lập trình hướng đối tượng trong Java',
    category: 'Java',
    author: 'Jane Smith',
    createdAt: '2023-06-05',
    thumbnail: 'https://example.com/java.jpg'
  },
  // Thêm các bài viết mẫu khác ở đây
];

export const sampleUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    avatar: 'https://example.com/john.jpg'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'admin',
    avatar: 'https://example.com/jane.jpg'
  },
  // Thêm các user mẫu khác ở đây
];

