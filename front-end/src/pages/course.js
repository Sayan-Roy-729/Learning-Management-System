import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import VideoPlayerController from '../components/VideoController/VideoController';
import Playlist from '../components/VideoPlaylist/VideoPlaylist';
import Loader from '../components/Loader/Loader';
import { getCourseContent } from '../actions/courseAction';

const PlaylistPage = (props) => {
    const courseId = props.match.params.id;
    const courseState = useSelector(state => state.courseReducer);
    const courseVideos = courseState['courseContent'];
    const dispatch = useDispatch();

    useEffect(() => {
        const courseDetails = courseState.courses.find(course => course['_id'] === courseId);
        dispatch(getCourseContent(courseDetails['name']));
    }, []);
    

    const [videoIndex, setVideoIndex] = useState(0);

    const videoPlayer = (event) => {
        if (videoIndex < courseVideos.length - 1) {
            setVideoIndex((oldState) => {
                return oldState + 1;
            });
        }
    };

    const videoChangeHandler = index => {
        setVideoIndex(index);
    };

    if (courseVideos.length <= 0) {
        return <Loader />
    } else if (courseState.loading) {
        return <Loader />
    } else {
        return (
            <>
                <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                    <Link className="navbar-brand" to="/">
                        CampusX
                    </Link>
                </nav>

                <div className="container">
                    <div className="row mt-4">
                        <div className="col-md-8">
                            <VideoPlayerController
                                video={`https://lms-backend-rest-api.herokuapp.com/${courseVideos[videoIndex]['videoUrl']}`}
                                VideoEnd={videoPlayer}
                                style={{border: '1px solid black'}}
                            />
                        </div>

                        <div className="col-md-4">
                            <Playlist videos = {courseVideos} videoChangeHandler = {videoChangeHandler}/>
                        </div>
                    </div>
                </div>
            </>
        );
    }
};

export default PlaylistPage;
