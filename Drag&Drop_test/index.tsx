import React from 'react'
import UploadFileArea, { useDocumentFiled } from './Drag&Drop'
import './index.css'

export default function DragAndDropWrapper() {

    const [document, documentError] = useDocumentFiled()
    const errorContent = () => {
        return (
            <div>Форматы: text, png</div>
        )
    }
    const contentFileZoneContent = (document:(File | undefined))=>{
        if (document) {
            return <div>
                        <div>
                            {document.name}
                        </div>
                        <div>
                            {document.size + ' bytes'}
                        </div>
                    </div>
        }
        else {
            return (
                <div>Upload</div>
            )
        }
    }

    return (
        <div className="form-wrapper">
            <UploadFileArea
                classModify="form-upload"
                classModifyActive="form-upload_active"
                classModifyError="form-upload-error"
                contentFileZoneContent={contentFileZoneContent}
                setDocument={document.setValue}
                document={document.value}
                passFormats={["text/plain", "application/pdf", "application/msword"]}
                error={documentError.error}
                setError={documentError.setError}
                errorContent={errorContent}
            />
        </div>
    )
}


