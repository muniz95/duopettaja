import React from 'react'
import '../styles/ProgressBar.css'

export default function ProgressBar ({progress = 0}) {
  return (
    <div>
      <div className="progress">
        <div className="progress-bar bg-duopettaja" role="progressbar" style={{width: `${progress}%`}}
          aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
        </div>
      </div>
      <span>{progress}%</span>
    </div>
  )
}
