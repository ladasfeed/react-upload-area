# react-upload-area (ts)
Hello everyone!
I made a customizable UI component — upload area. 
Structure:


    <div 
       //props of area
    >
        <div className={errorClasss}>{error}</div>
        {contentFileZoneContent(document)}
        <input type="file"/>
    </div>
    
It was much simplifyed for you, casue i want you only to understand structure for style customize. Here is area, error wrapper inside, function for 
rendering content (depends on isFileLoaded), and disabled input (it neccesary only for opening folder system on click).

To use this you should write some code like this: 

    import UploadFileArea, { useDocumentFiled } from './Drag&Drop'
    ...
  
    const [document, documentError] = useDocumentFiled()
    const errorContent = () => {
        return (
            <div>Formats: text, png</div>
        )
    }
    const contentFileZoneContent = (document:(File | undefined))=>{
        if (document) {
            return <div>{document.name}</div>
        }
        else {
            return (
                <div>Upload</div>
            )
        }
    }
    
* useDocumentFiled returns array with two objects - [{document, setDocument},{documentError, setDocumentError}]. We will use it as props for UploadArea component.
* errorContent renders content when we have error
* contentFileZoneContent renders content iside area - there are two variants. If document is uploaded - render (something), else - render (somthing else).
We almost finished. Let's see on UploadArea's props:

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
 
 1. classModify — class of area wrapper
 2. classModifyActive — class of area wrapper when file is uploaded
 3. classModifyError — class of error wrapper
 4. contentFileZoneContent - your custom function which returns ReactNode
 5. setDocument - dont touch
 6. passFormats - array of MIME
 7. error - dont touch
 8. setError - dont touch
 9. errorContent - your custom function which returns ReactNode
 
