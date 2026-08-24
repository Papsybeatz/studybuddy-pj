export class DocAgent {
  ingestDocument(fileName: string, rawContent: string): string {
    void fileName;
    void rawContent;
    throw new Error("Not implemented");
  }

  chunkDocument(text: string): string[] {
    void text;
    throw new Error("Not implemented");
  }

  generateEmbeddings(chunks: string[]): number[][] {
    void chunks;
    throw new Error("Not implemented");
  }

  storeDocumentData(documentId: string): void {
    void documentId;
    throw new Error("Not implemented");
  }
}
