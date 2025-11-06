import {Image, Text, TouchableOpacity, View} from "react-native";
import {Link} from "expo-router";
import MaskedView from "@react-native-masked-view/masked-view";
import {images} from "@/constants/images";

interface TrendingCardProps {
    movie: TrendingMovie;
    index: number;
}
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const TrendingCard = ({movie: {movie_id, title, poster_url}, index} : TrendingCardProps) => {
    const imageUrl =
        poster_url && poster_url !== "null"
            ? `${TMDB_IMAGE_BASE_URL}${poster_url}`
            : "https://via.placeholder.com/500x750?text=No+Image";

    return (
        <Link href={`/movies/${movie_id}`} asChild>
            <TouchableOpacity className={'w-32 relative pl-5'}>
                <Image
                    source={{uri: imageUrl}}
                    className={'w-32 h-48 rounded-lg'}
                    resizeMode={'cover'}
                />

                <View className={'absolute bottom-9 -left-3.5 px-2 py-1 rounded-full'}>
                    <MaskedView maskElement={
                        <Text className={'font-bold text-white text-6xl'}>{index + 1}</Text>
                    }>
                        <Image source={images.rankingGradient} className={'size-14'} resizeMode={'cover'} />
                    </MaskedView>
                </View>

                <Text className={'text-sm font-bold mt-2 text-light-200'} numberOfLines={2}>{title}</Text>
            </TouchableOpacity>
        </Link>
    )
}

export default TrendingCard;