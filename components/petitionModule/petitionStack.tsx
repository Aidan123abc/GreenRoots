import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Petitions from '@/app/(pages)/(tabs)/petitions';
import PetitionDetails from './PetitionsDetails';

const Stack = createNativeStackNavigator();

export default function PetitionsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="PetitionsScreen"
                component={Petitions}
                options={{ headerShown: false }} // Hide header for petitions list
            />
            <Stack.Screen
                name="PetitionDetails"
                component={PetitionDetails}
                options={{
                    headerShown: false, // Completely hide the header to remove added space
                }}
            />
        </Stack.Navigator>
    );
}
