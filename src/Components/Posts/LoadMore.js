import React from 'react';
import { LoadMore } from './style';

export default function LoadMoreButton({cb}){
    return (
        <LoadMore>
        <button onClick={cb}>Load More</button>
        </LoadMore>
    )
}
