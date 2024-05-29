import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { ClassicEditor } from "@ckeditor/ckeditor5-editor-classic";
import { Bold, Italic, Underline } from "@ckeditor/ckeditor5-basic-styles";
import { Essentials } from "@ckeditor/ckeditor5-essentials";
import { Paragraph } from "@ckeditor/ckeditor5-paragraph";
import { SimpleUploadAdapter } from "@ckeditor/ckeditor5-upload";
import { Heading, Title } from "@ckeditor/ckeditor5-heading";
import { Link, AutoLink } from "@ckeditor/ckeditor5-link";
import {
  List,
  ListProperties,
  AdjacentListsSupport,
} from "@ckeditor/ckeditor5-list";
import { Font } from "@ckeditor/ckeditor5-font";
import { Autoformat } from "@ckeditor/ckeditor5-autoformat";
import {
  Image,
  ImageCaption,
  ImageResizeEditing,
  ImageResizeHandles,
  ImageToolbar,
  ImageUpload,
  PictureEditing,
  ImageEditing,
} from "@ckeditor/ckeditor5-image";
import { Alignment } from "@ckeditor/ckeditor5-alignment";
import { CloudServices } from "@ckeditor/ckeditor5-cloud-services";
import { CKBox, CKBoxImageEdit } from "@ckeditor/ckeditor5-ckbox";
import { EasyImage } from "@ckeditor/ckeditor5-easy-image";

export default function CKEditorText({ setFormData, formData }) {
  const [editorData, setEditorData] = useState("");
  // const [publishError, setPublishError] = useState(null);
  // const IFRAME_SRC = process.env.IFRAME_SRC;
  // const API_KEY = process.env.API_KEY;
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    if (!formData) {
      setShowLoading(true);
    } else {
      setShowLoading(false);
    }
  }, [formData]);

  return (
    <>
      <CKEditor
        id="content"
        editor={ClassicEditor}
        config={{
          plugins: [
            EasyImage,
            CKBox,
            ImageUpload,
            Autoformat,
            Paragraph,
            Bold,
            Italic,
            Essentials,
            Underline,
            Image,
            Heading,
            Link,
            List,
            ListProperties,
            AdjacentListsSupport,
            AutoLink,
            Font,
            Title,
            Alignment,
            CKBoxImageEdit,
            CloudServices,
            SimpleUploadAdapter,
            ImageCaption,
            ImageResizeEditing,
            ImageResizeHandles,
            ImageToolbar,
            PictureEditing,
            ImageEditing,
          ],
          toolbar: [
            "undo",
            "redo",
            "|",
            "heading",
            "|",
            {
              label: "Basic Styles",
              icon: "text",
              items: ["bold", "italic", "underline", "alignment"],
            },
            "|",
            "bulletedList",
            "numberedList",
            "|",
            "fontSize",
            "fontFamily",
            "|",
            "image",
            "imageCaption",
            "imageResizeEditing",
            "imageResizeHandles",
            "imageUpload",
            "toggleImageCaption",
            "ckbox",
            "ckboxImageEdit",
            "imageEditing",
          ],

          cloudServices: {
            tokenUrl: `https://107180.cke-cs.com/token/dev/5ee4b304d7770742c2ee341886a2bceec8c192e37f9399971e1961c61cf7?limit=10`,
            uploadUrl: "https://107180.cke-cs.com/easyimage/upload/",
            withCredentials: false,
          },

          list: {
            multiBlock: false,
            properties: {
              styles: true,
              startIndex: true,
              reversed: true,
            },
            SimpleUpload: {
              uploadUrl: "/api/post/create-image",
              withCredentials: false,

              // Headers sent along with the XMLHttpRequest to the upload server.
              headers: {
                "X-CSRF-TOKEN": document
                  .querySelector('meta[name="csrf-token"]')
                  .getAttribute("content"),

                Authorization: "Bearer + <JSON Web Token>",
              },
            },
          },
        }}
        tag="textarea"
        data={editorData}
        onChange={(event, editor) => {
          const data = editor.getData();
          setEditorData(data);
          setFormData({ ...formData, content: data });
        }}
      />
    </>
  );
}
