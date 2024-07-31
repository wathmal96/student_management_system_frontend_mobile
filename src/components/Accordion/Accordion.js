import * as React from 'react';
import { ScrollView, StyleSheet, View, Animated } from 'react-native';
import { List,MD3Colors } from 'react-native-paper';
import { GestureHandlerRootView, RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import createAxiosInstance from '../../service/axiosOrder';
import Model from '../Model/Model';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons'


const Accordion = ({ dataArray, getsAll }) => {
    const [expandedIndex, setExpandedIndex] = React.useState(null);
    const [visible, setVisible] = React.useState(false);
    const [idStd, setIdStd] = React.useState(0)
    const swipeableRefs = React.useRef(dataArray.map(() => React.createRef()));

    const handlePress = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };


    const updateStd = async (addressApi, std) => {
        const axiosInstance = await createAxiosInstance();
        await axiosInstance.put(addressApi, std);
    }

    const clickLeft = (index, id) => {
        if (index !== null) {
            swipeableRefs.current[index].current.close();
            console.log("left action");
            setVisible(true)
            setIdStd(id)
        }
    };

    const clickRight = (index, id) => {
        if (index !== null) {
            swipeableRefs.current[index].current.close();
            deleteStudent(id)
            console.log("right action");
        }
    };

    const renderLeftActions = (progress, dragX, index, id) => {
        const translateX = dragX.interpolate({
            inputRange: [0, 50, 99.4, 101],
            outputRange: [-20, 0, 0, 1],
            // extrapolate: 'clamp',
        });

        return (
            <RectButton style={styles.leftAction} onPress={() => clickLeft(index, id)}>
                <Animated.Text style={[styles.actionText, { transform: [{ translateX }] }]}>
                    <MaterialIcons name="update" size={24} color="white" />
                </Animated.Text>
            </RectButton>
        );
    };

    const renderRightActions = (progress, dragX, index, id) => {
        const translateX = dragX.interpolate({
            inputRange: [-40, 170,180],
            outputRange: [0, 100,100],
            // extrapolate: 'clamp',
        });

        return (
            <RectButton style={styles.rightAction} onPress={() => clickRight(index, id)}>
                <Animated.Text style={[styles.actionTextRight, { transform: [{ translateX }] }]}>
                    <MaterialIcons name="delete" size={24} color="white" />
                </Animated.Text>
            </RectButton>
        );
    };

    const deleteStudent = async (id) => {
        try {
            const axiosInstance = await createAxiosInstance();
            const response = await axiosInstance.delete('/student/delete/' + id);

            getsAll()

            console.log(response.data);
        } catch (error) {
            console.error('Error delete students:', error)
        }
    }

    return (
        <>

            <ScrollView style={styles.container}>
                {dataArray.map((val, index) => (
                    <GestureHandlerRootView key={index}>
                        {expandedIndex !== index ? (
                            <Swipeable
                                ref={swipeableRefs.current[index]}
                                renderLeftActions={(progress, dragX) => renderLeftActions(progress, dragX, index, (val.id))}
                                renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, index, (val.id))}
                                overshootLeft={false}
                                overshootRight={false}
                            >
                                <View style={styles.itemContainer}>
                                    <List.Accordion
                                        title={val.student_name}
                                        expanded={expandedIndex === index}
                                        onPress={() => handlePress(index)}
                                        style={styles.accordion}
                                        right={props => <MaterialIcons name="keyboard-arrow-down" {...props} size={24} color="black" />}
                                    >
                                        <List.Item title={`Age: ${val.student_age}`} />
                                        <List.Item title={`Address: ${val.student_address}`} />
                                        <List.Item title={`Contact: ${val.student_contact}`} />
                                    </List.Accordion>
                                </View>
                            </Swipeable>
                        ) : (
                            <View style={styles.itemContainer}>
                                <List.Accordion
                                    title={val.student_name}
                                    expanded={expandedIndex === index}
                                    onPress={() => handlePress(index)}
                                    style={styles.accordion}
                                    right={props => <MaterialIcons name="keyboard-arrow-down" {...props} size={24} color="black" />}

                                >
                                    <List.Item title={`Age: ${val.student_age}`} />
                                    <List.Item title={`Address: ${val.student_address}`} />
                                    <List.Item title={`Contact: ${val.student_contact}`} />
                                </List.Accordion>
                            </View>
                        )}
                    </GestureHandlerRootView>
                ))}
            </ScrollView>

            <Model visible={visible} hideDialog={() => setVisible(false)} getAll={getsAll} apiCall={"update/" + idStd} testFn={updateStd} />

        </>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    itemContainer: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: 'white',
    },
    accordion: {
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 2,
    },
    leftAction: {
        flex: 1,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginVertical: 4,
    },
    rightAction: {
        flex: 1,
        backgroundColor: '#F44336',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginVertical: 4,
    },
    actionText: {
        color: 'white',
        fontSize: 16,
        paddingHorizontal: 12,
        paddingVertical: 10,
        textAlign: 'left',
        width: '100%',
    },
    actionTextRight: {
        color: 'white',
        fontSize: 16,
        paddingHorizontal: 12,
        paddingVertical: 10,
        textAlign: 'right',
        width: '100%',
    },
});

export default Accordion;
