export interface Attachment {
  id: number;
  url: string;
  ext: string;
  name: string;
  originalName: string;
  size: number;
  fileType: string;
  created_at: Date;
  updated_at: Date;
}

export interface AttachmentsState {
  attachments?: Attachment[];
  error?: string | null;
  isLoading?: boolean;
}
