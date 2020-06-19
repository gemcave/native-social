import React from 'react';
import { FlatList, View } from 'react-native';

import { Status, Separator } from '../components/Status';
import { Button } from '../components/Button';
import { useQuery } from '@apollo/react-hooks';
import { requestResponses } from '../graphql/queries';

const Thread = ({ navigation, route }) => {
  const originalStatus = route.params.status;
  const { data, loading } = useQuery(requestResponses, {
    variables: { _id: originalStatus._id },
  });

  if (loading) {
    return null;
  }

  return (
    <FlatList
      data={data.responses}
      renderItem={({ item }) => (
        <Status
          {...item}
          onHeartPress={() => alert('todo!')}
          indent={item._id !== originalStatus._id}
        />
      )}
      ItemSeparatorComponent={() => <Separator />}
      keyExtractor={(item) => item._id}
      ListFooterComponent={
        <View
          style={{
            flex: 1,
            marginBottom: 60,
            marginHorizontal: 30,
            marginTop: 10,
          }}
        >
          <Button
            text="New Reply"
            onPress={() =>
              navigation.navigate('NewStatus', { parent: originalStatus })
            }
          />
        </View>
      }
    />
  );
};

export default Thread;
