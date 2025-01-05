import React from 'react'

const DocumentTitle = ({title, children}) => {
    document.title = `CarCoach - ${title}`;
    return(
        <div className="w-100">
            {children}
        </div>
    )
}

export default DocumentTitle