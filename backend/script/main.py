import sys

def recommend_material(tags, difficulty_level, material_data):
    # Compute the similarity score between the given topics and the topics of each material
    material_scores = [] # This array has tuples (material, score)
    for material in material_data:
        material_tags = material["tags"]
        material_difficulty = material["difficulty"]
        # Calculate the score based on similar tags and difficulty level match
        tag_intersection = set(tags).intersection(material_tags)
        score = len(tag_intersection) / len(set(tags))
        material_scores.append((material, score))

    # Sort the materials by descending similarity score
    new_materials = [(material, score) for material, score in material_scores if score > 0.0]

    new_materials_updated = [(material, score + 0.25) if material["difficulty"] == difficulty_level else (material, score) for material, score in new_materials]

    new_materials_updated.sort(key=lambda x: x[1], reverse=True)

    # Select the material with the highest similarity score that matches the desired difficulty level
    for material, score in new_materials_updated:
        if material['difficulty'] == difficulty_level:
            recommended_material = (material, score)
            break
    else:
        # If there is no material with the desired difficulty level, select the one with the highest score
        recommended_material = new_materials_updated[0]

    return recommended_material


def main():
    # Parse command line arguments
    if len(sys.argv) != 4:
        print("Usage: python script.py <level> <tags> <helping_materials>")
        return


    # student_level = sys.argv[1]
    # weakness_tags = sys.argv[2].split(",")
    # helping_materials = eval(sys.argv[4])

    # recommended_material = recommend_material(weakness_tags, student_level, helping_materials)
    print({'message': 'hello jee'})


if __name__ == "__main__":
    main()
