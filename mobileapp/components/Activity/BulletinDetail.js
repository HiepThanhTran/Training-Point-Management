import { View, Text } from "react-native";
import GlobalStyle from "../../styles/Style";

const BulletinDetail = ({route}) => {
    const bulletinID = route.params?.bulletinID;
    return(
        <View style={GlobalStyle.Center}>
            <Text>
               Danh mục bài học số {bulletinID}
            </Text>
        </View>
    )
}

export default BulletinDetail;