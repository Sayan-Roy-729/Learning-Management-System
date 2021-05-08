import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import VideoPlayerController from '../components/VideoController/VideoController';
import Playlist from '../components/VideoPlaylist/VideoPlaylist';
import Loader from '../components/Loader/Loader';
import BootstrapNavbar from '../components/BootstrapNavbar/BootstrapNavbar';
import { getCourseContent, getCourses } from '../actions/courseAction';

const PlaylistPage = (props) => {
    const [videoIndex, setVideoIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const courseId = props.match.params.id;
    const courseState = useSelector(state => state.courseReducer);
    const courseVideos = courseState['courseContent'];
    const dispatch = useDispatch();

    useEffect(() => {
        if (courseState.courses.length <= 0) {
            setLoading(true);
            dispatch(getCourses());
        } else {
            const courseDetails = courseState.courses.find(course => course['_id'] === courseId);
            dispatch(getCourseContent(courseDetails['name']));
            setLoading(false);
        }
    }, [courseState.courses, courseId]);
    
    const videoPlayer = () => {
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
    } else if (loading) {
        return <Loader />
    } else {
        return (
            <>
                <BootstrapNavbar />

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
