import React, { ReactNode, ChangeEvent, useState } from 'react'
import { useRef } from "react"
import classNames from 'classnames'
import './index.css'

type FileUploadType = {
    contentFileZoneContent:(document:File | undefined) => ReactNode,
    setDocument: (value:File)=>void,
    document: File | undefined,
    classModify?: string,
    classModifyActive?: string,
    classModifyError?: string
    passFormats: Array<string>,
    error: ReactNode,
    setError: (error:ReactNode)=>void,
    errorContent: ReactNode
}

const UploadFileArea:React.FC<FileUploadType> = ({
    contentFileZoneContent, 
    setDocument, 
    document, 
    passFormats, 
    setError, 
    error,
    classModify='upload-area__default', 
    classModifyActive='upload-area__default_a',
    classModifyError='upload-area__default_error',
    errorContent
}) => {

    const inputReference = useRef<HTMLInputElement>(null)
    const dragArea = useRef<HTMLDivElement>(null)

    // HANDLERS
    const onDragOverHandler = (event:React.DragEvent<HTMLDivElement>) => {
        //@ts-ignore
        event.target.classList.add(classModifyActive)
        event.preventDefault();
    }

    const onDragLeaveHandler = (event:React.DragEvent<HTMLDivElement>) => {
        //@ts-ignore
        if (!document) event.target.classList.remove(classModifyActive)
    }

    const onDropHandler = async (event:React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        
        if (passFormats.includes(event.dataTransfer.files[0].type)) {
            setDocument(event.dataTransfer.files[0])
            setError(false)
        } else {
            setError(errorContent)
            //@ts-ignore
            if (!document) event.target.classList.remove(classModifyActive)
        }
    }

    const clickHandler = () => {
        if (inputReference.current) inputReference.current.click()
    }

    const onChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
        //@ts-ignore
        const currentInputFile = event.currentTarget.files[0];

        if (!currentInputFile) return
        
        if (passFormats.includes(currentInputFile.type)) {
            setDocument(currentInputFile)
            setError(false)
            if (dragArea.current) dragArea.current.classList.add(classModifyActive)
        } else {
            setError(errorContent)
        }

    }

  
    let errorClasss =  classNames('disabled-area', {
        [classModifyError]: error
    })
    return (
        <div 
            ref={dragArea}
            className={`${classModify} upload-area`}
            onDragOver={onDragOverHandler}
            onDrop={onDropHandler}
            onDragLeave={onDragLeaveHandler}
            onClick={clickHandler}
        >
            <div style={{pointerEvents: 'none'}} className={errorClasss}>{error}</div>
            {contentFileZoneContent(document)}
            <input ref={inputReference} onChange={onChangeHandler} type="file" id="file_input" />
        </div>
    )
}

export default UploadFileArea


type useDocumentFiledType = [
    {
        value : File | undefined,
        setValue : (value: File) => void
    },
    {
        error : ReactNode,
        setError : (value:ReactNode)=>void
    }
]
export const useDocumentFiled = ():useDocumentFiledType => {
    const [value, setValue] = useState<File>()
    const [error, setError] = useState<ReactNode>()

    return [
        {
            value,
            setValue
        },
        {
            error,
            setError
        }
    ]
}