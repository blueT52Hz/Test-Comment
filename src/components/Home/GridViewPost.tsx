import React from "react";
import { Link } from "react-router-dom";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Folder, Calendar, Tag } from "lucide-react";
import { Post } from "@/types/post";

export const GridViewPost: React.FC<{ post: Post }> = ({ post }) => (
  <Card className="bg-background border rounded-lg overflow-hidden hover:shadow-xl transition-transform transform hover:scale-105">
    <Link
      to={`/posts/${post.slug}`}
      state={{ id: post.id }}
      className="block group"
    >
      <div className="aspect-video relative overflow-hidden">
        <img
          src={post.thumbnail_image_url}
          alt={post.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <Link
            to={`/categories/${post.category.slug}`}
            className="text-xs text-muted-foreground flex items-center hover:text-primary transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <Folder className="w-4 h-4 inline mr-1" />
            {post.category.name}
          </Link>
          <div className="text-xs text-muted-foreground flex items-center">
            <Calendar className="w-4 h-4 inline mr-1" />
            {new Date(post.published_at).toLocaleDateString()}
          </div>
        </div>
        <CardTitle className="text-lg font-semibold mb-2"> 
          {post.title}
        </CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {post.excerpt}
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          {post.tags.map((tag) => (
            <Link
              key={tag.id}
              to={`/tags/${tag.slug}`}
              onClick={(e) => e.stopPropagation()}
            >
              <Badge
                variant="secondary"
                className="flex items-center space-x-1 hover:bg-secondary-foreground hover:text-secondary transition-colors"
              >
                <Tag className="w-3 h-3" />
                <span>{tag.name}</span>
              </Badge>
            </Link>
          ))}
        </div>
      </div>
    </Link>
  </Card>
);
