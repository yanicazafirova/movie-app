import {Client, Databases, ID, Query} from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_DATABASE_ID || '';
const COLLECTION_ID = process.env.EXPO_PUBLIC_COLLECTION_ID || '';

// @ts-ignore
const client = new Client()
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT || '')
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('searchTerms', query)
        ]);

        if (result.documents.length > 0) {
            const existingMovie = result.documents[0];

            await database.updateDocument(DATABASE_ID, COLLECTION_ID, existingMovie.$id, {
                count: existingMovie.count + 1
            })
        } else {
            await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                searchTerms: query,
                movie_id: movie.id,
                count: 1,
                title: movie.title,
                poster_url: `https://image.tmbd.org/t/p/w500/${movie.poster_path}`
            })
        }
    } catch (error) {
        console.log(error);
        throw error;
    }

}