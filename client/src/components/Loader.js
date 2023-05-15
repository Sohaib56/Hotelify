import React, { useState } from 'react'
import HashLoader from "react-spinners/HashLoader";

const Loader = () => {
    let [loading, setLoading] = useState(true);
    return (
        <div style={{ marginTop: '150px' }}>
            <div className="sweet-loading" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>


                <HashLoader
                    color='#000'
                    loading={loading}
                    cssOverride=''
                    size={80}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        </div>
    )
}

export default Loader
