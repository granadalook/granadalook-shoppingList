import {ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getMovieDetailById} from '../api/moviesApi';
import Headers from '../components/details/header';
import Description from '../components/details/description';
import {Detail} from '../interface/MovieDetail';

export default function detail(props: any) {
  const {
    route: {params},
    navigation,
  } = props;
  const [details, setDetail] = useState<Detail>(null);
  useEffect(() => {
    (async () => {
      try {
        const response = await getMovieDetailById(params.id);
        setDetail(response.data);
      } catch (error) {
        navigation.goBack();
      }
    })();
  }, [params]);
  if (!details) {
    return null;
  }

  
  return (
    <ScrollView>
      <Headers
        title={details.title}
        imagebg={details.backdrop_path}
        lenguage={details.original_language}
      />
      <Description
        overview={details.overview}
        tagline={details.tagline}
        date={details.release_date}
        time={details.runtime}
      />
    </ScrollView>
  );
}
