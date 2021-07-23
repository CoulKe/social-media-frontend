import React from 'react'
import Helmet from 'react-helmet';

const Meta = ({title, description}) => {
    return (
        <>
            <Helmet>
                <title>{title || "Luteya Social"}</title>
                <meta name='description' content={description || 'SPA social media demo'} />
            </Helmet>
        </>
    )
}

export default Meta