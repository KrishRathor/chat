import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectedUserState } from "../atoms/selectedUser";
import { fetchMessage } from "../atoms/fetchMessage";

interface IFileUploadModal {
  isOpen: boolean,
  closeModal: () => void
}

export const FileUploadModal: React.FC<IFileUploadModal> = (props) => {

  const { isOpen, closeModal } = props;

  if (!isOpen) return null;

  const [file, setFile] = useState<File | undefined>(undefined);
  const toUsername = useRecoilValue(selectedUserState);
  const setfetch = useSetRecoilState(fetchMessage);

  const handleFileUpload = async () => {

    const fromUsername = localStorage.getItem('username');
    if (!fromUsername) return;

    const request = await fetch('http://localhost:5000/api/v1/aws/getPresignedUrl');
    const { url, fields, link } = await request.json();

    const formData = new FormData();

    for (const key in fields) {
      if (fields.hasOwnProperty(key)) {
        formData.append(key, fields[key]);
      }
    }

    file && formData.append('file', file);

    await fetch(url, {
      method: 'POST',
      body: formData
    })

    const req = await fetch('http://localhost:5000/api/v1/aws/saveToDb', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fromUsername,
        toUsername,
        link
      })
    })

    await req.json();
    setfetch(prev => !prev);
    closeModal();

  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={closeModal}
      ></div>

      <div className="bg-white p-8 rounded-lg shadow-lg z-10">
        <h2 className="text-lg font-bold mb-4">Send files via our chat app</h2>
        <input onChange={e => {
          if (e.target.files) setFile(e.target.files[0]);
        }} placeholder="Upload your file here" type="file" />
        <div className="flex mt-2" >
          <button
            onClick={handleFileUpload}
            className="px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Upload
          </button>
          <button
            onClick={closeModal}
            className="px-4 ml-2 py-2 bg-red-500 text-white rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};


