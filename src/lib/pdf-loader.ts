import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { env } from "./config";

export async function getChunkedDocsFromPDF() {
    try {


      const loader = new PDFLoader(env.PDF_PATH);
      // load a markdown file insted of a pdf file
      
      const docs = await loader.load();
  
      const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
      });
  
      const chunkedDocs = await textSplitter.splitDocuments(docs);
  
      return chunkedDocs;
    } catch (e) {
      console.error(e);
      throw new Error("PDF docs chunking failed !");
    }
  }
