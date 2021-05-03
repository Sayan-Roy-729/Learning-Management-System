import React from 'react';

const PlayList = props => {
    
    return (        
        <ul className="list-group" style = {{maxHeight: '300px', overflowY: 'scroll'}}>
            {
                props.videos.map((item, index) => {
                    return (
                        <li className = "list-group-item" role = "button" key = {index} onClick = {() => props.videoChangeHandler(index)}>{item.title}</li>
                    );
                })
            }
        </ul>
    );
};

export default PlayList;