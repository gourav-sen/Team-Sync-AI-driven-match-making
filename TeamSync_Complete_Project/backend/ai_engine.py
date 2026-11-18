from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

model = SentenceTransformer("all-MiniLM-L6-v2")

def generate_embedding(data_list):
    text_data = " ".join(data_list)
    return model.encode(text_data).tolist()

def find_best_matches(target_skills, candidates, top_k=3):
    if not candidates:
        return []
    
    target_embedding = generate_embedding(target_skills)
    target_vec = np.array(target_embedding).reshape(1, -1)
    candidate_embeddings = [np.array(c["embedding"]) for c in candidates]
    
    similarities = cosine_similarity(target_vec, candidate_embeddings)[0]
    
    results = []
    for i in range(len(candidates)):
        candidates[i]["match_score"] = float(similarities[i])
        results.append(candidates[i])
        
    results.sort(key=lambda x: x["match_score"], reverse=True)
    return results[:top_k]
