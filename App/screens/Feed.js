import React from 'react';
import { FlatList, View } from 'react-native';

import { Status, Separator } from '../components/Status';
import { useQuery } from '@apollo/react-hooks';
import { requestFeed } from '../graphql/queries';
// import { requestFeed } from '../graphql/feedQueries';

const Feed = ({ navigation }) => {
  const { data, loading } = useQuery(requestFeed);
  if (loading) {
    return null;
  }
  console.log(data);

  return (
    <FlatList
      data={data.feed}
      renderItem={({ item }) => (
        <Status
          {...item}
          onRowPress={() => navigation.push('Thread', { status: item })}
          onHeartPress={() => alert('todo!')}
        />
      )}
      ItemSeparatorComponent={() => <Separator />}
      keyExtractor={(item) => item._id}
      ListFooterComponent={<View style={{ flex: 1, marginBottom: 60 }} />}
    />
  );
};

export default Feed;
