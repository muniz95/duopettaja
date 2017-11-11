import React from 'react';

export default function CompoundQuestion({question, options}) {
    return (
        <div>
            <div className="row">
                <h4>{question}</h4>
            </div>
            <div className="row">
                {options.map(option => 
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">{option.text}</div>
                )}
            </div>
        </div>
    )
}