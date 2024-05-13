import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
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
// import { Title } from "@ckeditor/ckeditor5-heading";
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
// import { CKBox } from "@ckeditor/ckeditor5-ckbox";
import { CloudServices } from "@ckeditor/ckeditor5-cloud-services";
import { CKBox, CKBoxImageEdit } from "@ckeditor/ckeditor5-ckbox";
import { EasyImage } from "@ckeditor/ckeditor5-easy-image";
import { Loader2 } from "lucide-react";

export default function CKEditorTextUpdate({ setFormData, formData }) {
  const [editorData, setEditorData] = useState("");
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    if (!formData.content) {
      setShowLoading(true);
    } else {
      setShowLoading(false);
    }
  }, [formData.content]);

  return (
    <>
      {showLoading ? (
        // <div className="flex justify-center items-center pt-80">
        //   <div className="border-gray-300 h-10 w-10 animate-spin rounded-full border-8 border-t-blue-600" />
        // </div>
        <div className="flex justify-center items-center pt-80">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <CKEditor
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
              "ckbox",
              "ckboxImageEdit",
              "ImageEditing",
            ],
            cloudServices: {
              tokenUrl: `https://107180.cke-cs.com/token/dev/bb45727ab997decb393ca41204eab5ef596d4d01b3fc00ba69bce7a15551?limit=10`,
              uploadUrl: "https://107180.cke-cs.com/easyimage/upload/",
              withCredentials: false,

              // headers: {
              //   "X-CSRF-TOKEN": document
              //     .querySelector('meta[name="csrf-token"]')
              //     .getAttribute("content"),

              //   Authorization: "Bearer <JSON Web Token>",
              // },
            },

            list: {
              multiBlock: false,
              properties: {
                styles: true,
                startIndex: true,
                reversed: true,
              },
              // SimpleUpload: {
              //   uploadUrl: "/api/post/create-image",
              //   withCredentials: true,

              // Headers sent along with the XMLHttpRequest to the upload server.
              // headers: {
              //   "X-CSRF-TOKEN": document
              //     .querySelector('meta[name="csrf-token"]')
              //     .getAttribute("content"),

              //   Authorization: "Bearer <JSON Web Token>",
              // },
              // },
            },
          }}
          tag="textarea"
          data={formData.content}
          onReady={(editor) => {
            setEditorData(editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setEditorData(data);
            setFormData({ ...formData, content: data });
          }}
          render={(editor) =>
            //   (
            //   <div
            //     data={formData.content}

            //   />
            // )
            {
              editor.setData(formData.content);
            }
          }
        />
      )}
    </>
  );
}
