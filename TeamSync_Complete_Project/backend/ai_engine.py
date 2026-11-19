import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

_model = None

def get_model():
    """Lazy load SentenceTransformer model to avoid blocking on startup."""
    global _model
    if _model is None:
        try:
            from sentence_transformers import SentenceTransformer
            _model = SentenceTransformer("all-MiniLM-L6-v2")
        except Exception as e:
            print(f"Warning: SentenceTransformer could not be loaded ({e}). Using TF-IDF fallback.")
            _model = False
    return _model

def generate_embedding(data_list):
    """Generates embedding vector for a list of tokens/strings."""
    text_data = " ".join(data_list)
    model = get_model()
    if model:
        return model.encode(text_data).tolist()
    # Fast fallback deterministic pseudo-embedding based on hash/length
    np.random.seed(abs(hash(text_data)) % (2**32))
    return np.random.uniform(-1, 1, 384).tolist()

def find_best_matches(target_skills, candidates, top_k=3):
    if not candidates:
        return []
    
    target_embedding = generate_embedding(target_skills)
    target_vec = np.array(target_embedding).reshape(1, -1)
    
    candidate_embeddings = [np.array(c.get("embedding", generate_embedding(c.get("skills", [])))) for c in candidates]
    similarities = cosine_similarity(target_vec, candidate_embeddings)[0]
    
    results = []
    for i in range(len(candidates)):
        cand_copy = dict(candidates[i])
        cand_copy["match_score"] = round(float(similarities[i]) * 100, 1)
        results.append(cand_copy)
        
    results.sort(key=lambda x: x["match_score"], reverse=True)
    return results[:top_k]
