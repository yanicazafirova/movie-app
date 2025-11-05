import {View, Text} from "react-native";


const MovieCard = ({id, poster_path, title, vote_average, release_date}: Movie) => {
    return (
        <View>
            <Text className={'text-white'}>{title}</Text>
        </View>
    );
}

export default MovieCard;