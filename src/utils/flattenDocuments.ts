import { Document, FlattenDocument } from "./api";

/**
 * It takes an array of documents, and returns an array of flattened documents
 * @param {Document[]} documents - Document[] - the array of documents to flatten
 * @param {FlattenDocument[]} flatDocuments - FlattenDocument[] = []
 * @returns An array of objects with the following properties:
 */
function flattenDocuments(
  documents: Document[],
  flatDocuments: FlattenDocument[] = []
) {
  documents.forEach(({ childrens, ...doc }) => {
    flatDocuments.push(doc);
    if (childrens && childrens.length > 0) {
      flattenDocuments(childrens, flatDocuments);
    }
  });

  return flatDocuments;
}

export default flattenDocuments;
