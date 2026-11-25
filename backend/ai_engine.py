import numpy as np

def cosine_similarity(a, b):
    a = np.atleast_2d(a)
    b = np.atleast_2d(b)
    norm_a = np.linalg.norm(a, axis=1, keepdims=True)
    norm_b = np.linalg.norm(b, axis=1, keepdims=True)
    return np.dot(a, b.T) / (norm_a * norm_b.T + 1e-9)

VOCABULARY = [
    "react", "frontend", "backend", "fastapi", "mongodb", "python",
    "java", "c++", "machine learning", "ai", "data science",
    "node.js", "sql", "app", "mobile", "tailwind css", "javascript",
    "django", "tensorflow", "pytorch", "ui/ux", "web development",
    "apis", "deep learning", "full stack"
]

def generate_embedding(data_list):
    text_data = " ".join(data_list).lower() if isinstance(data_list, list) else str(data_list).lower()
    vec = []
    for term in VOCABULARY:
        count = float(text_data.count(term))
        vec.append(count)
    arr = np.array(vec, dtype=float)
    norm = np.linalg.norm(arr)
    if norm > 0:
        arr = arr / norm
    return arr.tolist()

def find_best_matches(target_skills, candidates, top_k=3):
    if not candidates:
        return []

    target_embedding = generate_embedding(target_skills)
    target_vec = np.array(target_embedding).reshape(1, -1)

    dim = target_vec.shape[1]
    candidate_embeddings = []
    for c in candidates:
        emb = c.get("embedding", [])
        if len(emb) != dim:
            emb = generate_embedding(c.get("skills", []) + c.get("interests", []))
            c["embedding"] = emb
        candidate_embeddings.append(np.array(emb))

    candidate_embeddings = np.array(candidate_embeddings)
    similarities = cosine_similarity(target_vec, candidate_embeddings)[0]

    results = []
    for i in range(len(candidates)):
        candidates[i]["match_score"] = float(similarities[i])
        results.append(candidates[i])

    results.sort(key=lambda x: x["match_score"], reverse=True)
    return results[:top_k]
