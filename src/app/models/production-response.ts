import { ProductionPreview, Video } from "./production";

export interface ProductionResponse {
    page: number;
    results: ProductionPreview[];
    total_pages: number;
    total_results: number;
}

export interface VideosResponse {
    id: number;
    results: Video[];
}