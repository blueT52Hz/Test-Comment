import { useToast } from "@/hooks/use-toast";
import React, { useState } from "react";
import {
  FiClipboard,
  FiChevronDown,
  FiChevronUp,
  FiCheck,
} from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { Toaster } from "@/components/ui/toaster";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Post {
  content: string;
}

interface MarkdownRenderProps {
  post: Post;
}

export const MarkdownRender: React.FC<MarkdownRenderProps> = ({ post }) => {
  const { toast } = useToast();
  const [expandedBlocks, setExpandedBlocks] = useState<string[]>([]); // Mảng lưu các block mở rộng
  const [copiedBlock, setCopiedBlock] = useState<string | null>(null); // Lưu block vừa được sao chép

  const copyCodeToClipboard = (blockId: string, code: string) => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setCopiedBlock(blockId); // Đặt block ID đã sao chép
        toast({
          title: "Code copied!",
          description: "The code has been copied to your clipboard.",
          duration: 2000,
        });
        setTimeout(() => setCopiedBlock(null), 2000); // Trở về trạng thái bình thường sau 2s
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Failed to copy code.",
          duration: 3000,
        });
      });
  };

  const toggleCodeBlock = (blockId: string) => {
    console.log(blockId);

    setExpandedBlocks(
      (prev) =>
        prev.includes(blockId)
          ? prev.filter((id) => id !== blockId) // Xóa blockId nếu đã tồn tại
          : [...prev, blockId] // Thêm blockId nếu chưa tồn tại
    );
  };

  return (
    <>
      <ReactMarkdown
        components={{
          h2: ({ node, ...props }) => (
            <h2
              id={props.children // báo đỏ cũng không sao
                .toString()
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")}
              className="text-2xl font-bold mt-8 mb-4"
              {...props}
            />
          ),
          h3: ({ node, ...props }) => (
            <h3
              id={props.children // báo đỏ cũng không sao
                .toString()
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")}
              className="text-xl font-semibold mt-6 mb-3"
              {...props}
            />
          ),
          p: ({ node, ...props }) => <p className="mb-4" {...props} />,
          img: ({ node, alt, src, title, ...props }) => (
            <div className="flex flex-col items-center my-4">
              <img
                className="rounded-lg shadow-md"
                src={src}
                alt={alt}
                title={title}
                {...props}
              />
              {alt && (
                <span className="text-sm text-gray-500 mt-2 italic">{alt}</span>
              )}
            </div>
          ),
          code: ({ node, inline, className, children, ...props }) => {
            // báo đỏ cũng không sao
            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1].toLowerCase() : "CODE";
            const code = String(children).replace(/\n$/, "");
            const lines = code.split("\n");
            const blockId = `${language}-${code.slice(20, 50)}`; // ID duy nhất dựa trên nội dung
            const isExpanded = expandedBlocks.includes(blockId); // Kiểm tra blockId có trong mảng
            const shouldCollapse = lines.length > 20;

            if (!inline && match) {
              return (
                <div className="relative group overflow-hidden my-5 rounded-lg shadow-md">
                  <div className="flex justify-between items-center bg-gray-800 text-white text-sm px-4 py-2 rounded-t-lg">
                    <div className="flex space-x-2 mr-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-mono mr-2">{`</>`}</span>
                      <span className="font-mono">{language}</span>
                    </div>
                    <button
                      onClick={() => copyCodeToClipboard(blockId, code)}
                      className="flex items-center justify-end text-gray-300 hover:text-white transition-colors"
                    >
                      <span className="flex items-center justify-end min-w-[100px]">
                        {copiedBlock === blockId ? (
                          <>
                            Copied
                            <FiCheck className="ml-2 w-5 h-5 text-green-400" />
                          </>
                        ) : (
                          <>
                            Copy
                            <FiClipboard className="ml-2 w-5 h-5" />
                          </>
                        )}
                      </span>
                    </button>
                  </div>
                  <div
                    className={`relative ${
                      shouldCollapse && !isExpanded
                        ? "max-h-[500px] overflow-hidden"
                        : ""
                    }`}
                  >
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={match[1]}
                      PreTag="div"
                      showLineNumbers={true}
                      lineNumberStyle={{
                        marginRight: "1rem",
                      }}
                      customStyle={{
                        border: "none",
                        borderRadius: "0 0 8px 8px",
                        margin: "0",
                      }}
                      {...props}
                    >
                      {code}
                    </SyntaxHighlighter>
                    {shouldCollapse && !isExpanded && (
                      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-900 to-transparent flex items-end justify-center">
                        <button
                          onClick={() => toggleCodeBlock(blockId)}
                          className="mb-2 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors flex items-center"
                        >
                          Show more
                          <FiChevronDown className="ml-2" />
                        </button>
                      </div>
                    )}
                  </div>
                  {shouldCollapse && isExpanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-20 flex items-end justify-end pr-4">
                      <button
                        onClick={() => toggleCodeBlock(blockId)}
                        className="mb-2 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors flex items-center"
                      >
                        Show less
                        <FiChevronUp className="ml-2" />
                      </button>
                    </div>
                  )}
                </div>
              );
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {post.content}
      </ReactMarkdown>
      <Toaster />
    </>
  );
};
