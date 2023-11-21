import React, { FC, useRef } from 'react';
import { ReactComponent as Attach } from 'shared/assets/icons/paper-clip.svg';
import { Button } from 'shared/ui/Button';

interface FileUploadProps {
  onSetPreview?: React.Dispatch<React.SetStateAction<File[] | null>>;
  filesCount?: number;
}

export const FileUpload: FC<FileUploadProps> = ({
  onSetPreview,
  filesCount = 3,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const createPreview = (fileList: FileList | null) => {
    if (!fileList) return;
    if (onSetPreview) {
      onSetPreview(Object.values(fileList).slice(0, filesCount));
    }
  };

  return (
    <Button onClick={() => inputRef.current?.click()}>
      <input
        accept="image/*"
        multiple
        max={filesCount}
        onChange={(file) => createPreview(file.target.files)}
        type="file"
        hidden
        ref={inputRef}
      />
      <Attach className="icon" />
    </Button>
  );
};
