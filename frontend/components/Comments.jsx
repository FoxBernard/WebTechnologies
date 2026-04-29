import { useEffect, useState } from "react";

const API_URL = "http://localhost:9000";

export default function Comments({ eventId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  // GET USER
  useEffect(() => {
    fetch(`${API_URL}/api/auth/me`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setCurrentUser(data.user || data))
      .catch(() => setCurrentUser(null));
  }, []);

  // LOAD COMMENTS
  useEffect(() => {
    if (!eventId) return;

    fetch(`${API_URL}/api/comments?eventId=${eventId}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setComments(Array.isArray(data) ? data : []));
  }, [eventId]);

  // ADD COMMENT
  const addComment = async () => {
    if (!text.trim()) return;

    const res = await fetch(`${API_URL}/api/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        eventId,
        comment: text,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setComments((prev) => [...prev, data]);
      setText("");
    } else {
      console.log("POST FAILED:", data);
    }
  };

  // DELETE COMMENT
  const deleteComment = async (id) => {
    const res = await fetch(`${API_URL}/api/comments/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (res.ok) {
      setComments((prev) => prev.filter((c) => c._id !== id));
    }
  };

  return (
    <div>
      <h4>Comments</h4>

      {comments.map((c) => (
        <div key={c._id} style={{ display: "flex", gap: "10px" }}>
          <p>
            💬 {c.comment}{" "}
            <small>by {c.userID?.username || "unknown"}</small>
          </p>

          {/* FIXED OWNER CHECK */}
          {currentUser?.id === (c.userID?._id || c.userID) && (
            <button onClick={() => deleteComment(c._id)}>Delete</button>
          )}
        </div>
      ))}

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write comment..."
      />

      <button onClick={addComment}>Post</button>
    </div>
  );
}