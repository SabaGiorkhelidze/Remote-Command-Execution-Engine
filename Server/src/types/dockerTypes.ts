export interface startContainerTypes {
    container: string;
    image: string;
    cmd?: string[];
    ports?: Record<string, string>;
}