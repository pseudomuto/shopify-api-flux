"use strict";

jest.autoMockOff();

const ShopifyAPI        = require("../../ShopifyAPI");
const { Blog, Session } = ShopifyAPI;

const BlogId = 26362181;

describe("blogs API", () => {
  setupIntegrationTest(Session);

  describe("getting blogs", () => {
    pit("GET /admin/blogs.json", () => {
      return Blog.fetch().then(blogs => {
        expect(blogs.length).toBeGreaterThan(0);
      });
    });

    pit("GET /admin/blogs.json?ids=", () => {
      return Blog.fetch({ ids: [BlogId] }).then(blogs => {
        expect(blogs.length).toBe(1);
        expect(blogs[0].id).toBe(BlogId);
      });
    });

    pit("GET /admin/blogs/:id.json", () => {
      return Blog.fetch(BlogId).then(blogs => {
        expect(blogs).toBeDefined();
        expect(blogs.length).toBe(1);
        expect(blogs[0].id).toBe(BlogId);
      });
    });
  });

  describe("counting blogs", () => {
    pit ("GET /admin/blogs/count.json", () => {
      return Blog.fetchCount().then(count => {
        expect(count).toBeGreaterThan(0);
      });
    });

    pit ("GET /admin/blogs/count.json?id=", () => {
      return Blog.fetchCount({ id: BlogId }).then(count => {
        expect(count).toBe(1);
      });
    });
  });
});
