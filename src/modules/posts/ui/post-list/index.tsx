import React, { useState } from "react";
import { Card, CardBody, CardFooter, Button, Input } from "@nextui-org/react";
import { Eye, Pencil, Trash2, Save } from "lucide-react";
import { Post } from "../../types";
import { Link } from "react-router-dom";
import { parsedToken } from "../../../../shared/lib/parse-token";

interface PostListProps {
  posts: Post[];
  onDelete?: (id: number) => void;
  onEdit?: (post: Post) => void;
}

export const PostList: React.FC<PostListProps> = ({
  posts,
  onDelete,
  onEdit,
}) => {
  const currentUserInfo = parsedToken();

  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [updatedTitle, setUpdatedTitle] = useState<string>("");
  const [updatedContent, setUpdatedContent] = useState<string>("");

  const startEditing = (post: Post) => {
    setEditingPostId(post.id);
    setUpdatedTitle(post.title);
    setUpdatedContent(post.content);
  };

  const saveChanges = (post: Post) => {
    onEdit?.({
      ...post,
      title: updatedTitle,
      content: updatedContent,
    });
    setEditingPostId(null);
  };

  const cancelEditing = () => {
    setEditingPostId(null);
    setUpdatedTitle("");
    setUpdatedContent("");
  };

  return (
    <div className="grid grid-cols-1 my-4 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => (
        <Card key={post.id} className="max-w-sm">
          <CardBody>
            {editingPostId === post.id ? (
              <>
                <Input
                  fullWidth
                  value={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                  label="Title"
                />
                <Input
                  fullWidth
                  value={updatedContent}
                  onChange={(e) => setUpdatedContent(e.target.value)}
                  label="Content"
                  className="mt-4"
                />
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 line-clamp-3">{post.content}</p>
              </>
            )}
          </CardBody>
          <CardFooter className="justify-between">
            {editingPostId === post.id ? (
              <>
                <Button
                  color="primary"
                  variant="flat"
                  startContent={<Save size={18} />}
                  onPress={() => saveChanges(post)}
                >
                  Save
                </Button>
                <Button color="danger" variant="flat" onPress={cancelEditing}>
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button
                  as={Link}
                  to={`/posts/${post.id}`}
                  color="primary"
                  variant="flat"
                  startContent={<Eye size={18} />}
                >
                  View
                </Button>
                {post.user.id === currentUserInfo?.userId &&
                  onDelete &&
                  onEdit && (
                    <>
                      <Button
                        color="warning"
                        variant="flat"
                        startContent={<Pencil size={18} />}
                        onPress={() => startEditing(post)}
                      >
                        Edit
                      </Button>
                      <Button
                        color="danger"
                        variant="flat"
                        startContent={<Trash2 size={18} />}
                        onPress={() => onDelete(post.id)}
                      >
                        Delete
                      </Button>
                    </>
                  )}
              </>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
