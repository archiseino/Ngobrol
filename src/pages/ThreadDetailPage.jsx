// src/pages/ThreadDetailPage.jsximport React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetThreadDetail } from '../states/threadDetail/thunk';
import ThreadDetail from '../components/ThreadDetail';
import CommentList from '../components/CommentList';
import CommentInput from '../components/comment/CommentInput';
import { FaArrowLeft } from 'react-icons/fa';

import React, { useState, useEffect } from 'react';

const ThreadDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Access the threadDetail from Redux state
  const { threadDetail } = useSelector((state) => ({
    threadDetail: state.threadDetail,
  }));

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchThreadDetail = async () => {
      setLoading(true);
      try {
        console.log(`Fetching thread detail for ID: ${id}`);
        await dispatch(asyncGetThreadDetail(id));
        console.log('Thread detail fetch completed');
      } catch (error) {
        console.error('Failed to load thread:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchThreadDetail();
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!threadDetail || !threadDetail.id) {
    return (
      <div className="p-4">
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold mb-4">Thread not found</h2>
          <p className="mb-4">
            The thread you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate('/home')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center mb-4 text-blue-600 hover:underline"
      >
        <FaArrowLeft className="mr-2" /> Back
      </button>

      <ThreadDetail thread={threadDetail} />
      <CommentInput threadId={id} />
      <CommentList comments={threadDetail.comments} threadId={id} />
    </div>
  );
};

export default ThreadDetailPage;
