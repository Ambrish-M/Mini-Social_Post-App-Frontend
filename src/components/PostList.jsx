import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import api from "../services/api";
import PostCard from "./PostCard";
import { useAuth } from "../context/AuthContext";

export default function PostList({ activeTab }) {
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        try {
            const res = await api.get("/posts");
            setPosts(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);


    const filteredPosts = posts.filter((post) => {
        if (activeTab === "liked") {
            return post.likes?.some(
                (like) => like.username === user?.username
            );
        }

        if (activeTab === "commented") {
            return post.comments?.some(
                (comment) => comment.username === user?.username
            );
        }

        return true; // all posts
    });


    if (loading) {
        return (
            <div className="text-center my-4">
                <Spinner animation="border" />
            </div>
        );
    }

    if (filteredPosts.length === 0) {
        return (
            <p className="text-center text-muted">
                No posts to display
            </p>
        );
    }

    return (
        <>
            {filteredPosts.map((post) => (
                <PostCard
                    key={post._id}
                    post={post}
                    activeTab={activeTab}
                    onUpdate={fetchPosts}
                />
            ))}
        </>
    );
}
