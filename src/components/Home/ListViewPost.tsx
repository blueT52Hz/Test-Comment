import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Folder, Calendar, Tag } from "lucide-react";
import { Post } from "@/types/post";

export const ListViewPost: React.FC<{ post: Post }> = ({ post }) => (
  <div className="px-6 mt-4">
    <div className="hover:shadow-xl transition-transform transform hover:scale-105">
      <Link
        to={`/posts/${post.slug}`}
        state={{ id: post.id }}
        className="block"
      >
        <div className="flex">
          {/* Thumbnail Image */}
          <div className="w-48 shrink-0 flex items-center justify-center">
            <img
              src={post.thumbnail_image_url}
              alt={post.title}
              className="h-32 rounded-lg object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex-1">
            <CardHeader className="relative p-4">
              <CardTitle className="text-xl font-semibold">
                {post.title}
              </CardTitle>
              <div className="absolute top-4 right-4 flex items-center text-xs text-muted-foreground">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(post.published_at).toLocaleDateString()}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{post.excerpt}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center p-4">
              <Link
                to={`/categories/${post.category.slug}`}
                className="flex items-center text-sm text-muted-foreground hover:text-primary"
                onClick={(e) => e.stopPropagation()}
              >
                <Folder className="w-4 h-4 mr-1" />
                {post.category.name}
              </Link>
              <div className="flex flex-wrap gap-2">
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
            </CardFooter>
          </div>
        </div>
      </Link>
    </div>
  </div>
);

