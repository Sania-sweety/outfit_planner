import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

export default function CalendarScreen({ navigation }) {
 

  // Currently selected date
  const [selectedDate, setSelectedDate] = useState(null);

  // Outfit planned for each date
  const [plannedOutfits, setPlannedOutfits] = useState({});


  // ------------------------------------------------
  // CALENDAR DATA
  // ------------------------------------------------

  const days = [
    { day: 1, date: '2026-08-01' },
    { day: 2, date: '2026-08-02' },
    { day: 3, date: '2026-08-03' },
    { day: 4, date: '2026-08-04' },
    { day: 5, date: '2026-08-05' },
    { day: 6, date: '2026-08-06' },
    { day: 7, date: '2026-08-07' },
    { day: 8, date: '2026-08-08' },
    { day: 9, date: '2026-08-09' },
    { day: 10, date: '2026-08-10' },
    { day: 11, date: '2026-08-11' },
    { day: 12, date: '2026-08-12' },
    { day: 13, date: '2026-08-13' },
    { day: 14, date: '2026-08-14' },
    { day: 15, date: '2026-08-15' },
    { day: 16, date: '2026-08-16' },
    { day: 17, date: '2026-08-17' },
    { day: 18, date: '2026-08-18' },
    { day: 19, date: '2026-08-19' },
    { day: 20, date: '2026-08-20' },
    { day: 21, date: '2026-08-21' },
    { day: 22, date: '2026-08-22' },
    { day: 23, date: '2026-08-23' },
    { day: 24, date: '2026-08-24' },
    { day: 25, date: '2026-08-25' },
    { day: 26, date: '2026-08-26' },
    { day: 27, date: '2026-08-27' },
    { day: 28, date: '2026-08-28' },
    { day: 29, date: '2026-08-29' },
    { day: 30, date: '2026-08-30' },
    { day: 31, date: '2026-08-31' },
  ];


  // ------------------------------------------------
  // SELECT DATE
  // ------------------------------------------------

  const selectDate = (date) => {
    setSelectedDate(date);
  };


  // ------------------------------------------------
  // PLAN OUTFIT
  // ------------------------------------------------

  const planOutfit = () => {

    if (!selectedDate) {
      Alert.alert(
        'Select Date',
        'Please select a date first.'
      );

      return;
    }


    Alert.alert(
      'Choose Outfit',

      'Select an outfit for this date.',

      [
        {
          text: 'College Outfit',
          onPress: () => saveOutfit('College Outfit'),
        },

        {
          text: 'Casual Outfit',
          onPress: () => saveOutfit('Casual Outfit'),
        },

        {
          text: 'Party Outfit',
          onPress: () => saveOutfit('Party Outfit'),
        },

        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };


  // ------------------------------------------------
  // SAVE OUTFIT
  // ------------------------------------------------

  const saveOutfit = (outfitName) => {

    setPlannedOutfits((current) => ({
      ...current,
      [selectedDate]: outfitName,
    }));

    Alert.alert(
      'Outfit Saved',
      `${outfitName} planned for ${selectedDate}.`
    );
  };


  // ------------------------------------------------
  // DELETE OUTFIT
  // ------------------------------------------------

  const deleteOutfit = () => {

    if (!selectedDate) {
      return;
    }

    setPlannedOutfits((current) => {

      const updated = { ...current };

      delete updated[selectedDate];

      return updated;
    });

    Alert.alert(
      'Deleted',
      'The planned outfit has been removed.'
    );
  };


  // ------------------------------------------------
  // CURRENT OUTFIT
  // ------------------------------------------------

  const currentOutfit =
    selectedDate
      ? plannedOutfits[selectedDate]
      : null;


  // ------------------------------------------------
  // UI
  // ------------------------------------------------

  return (

    <View style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {/* BACK BUTTON */}

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >

          <Text style={styles.backText}>
            ← Back
          </Text>

        </TouchableOpacity>


        {/* TITLE */}

        <Text style={styles.title}>
          Outfit Calendar
        </Text>

        <Text style={styles.subtitle}>
          Plan your outfits for each day.
        </Text>


        {/* MONTH */}

        <View style={styles.monthHeader}>

          <Text style={styles.monthTitle}>
            August 2026
          </Text>

        </View>


        {/* WEEK DAYS */}

        <View style={styles.weekRow}>

          <Text style={styles.weekText}>M</Text>
          <Text style={styles.weekText}>T</Text>
          <Text style={styles.weekText}>W</Text>
          <Text style={styles.weekText}>T</Text>
          <Text style={styles.weekText}>F</Text>
          <Text style={styles.weekText}>S</Text>
          <Text style={styles.weekText}>S</Text>

        </View>


        {/* CALENDAR */}

        <View style={styles.calendar}>

          {days.map((item) => (

            <TouchableOpacity
              key={item.date}
              style={[
                styles.dayButton,

                selectedDate === item.date &&
                  styles.selectedDay,

                plannedOutfits[item.date] &&
                  styles.plannedDay,
              ]}
              onPress={() => selectDate(item.date)}
            >

              <Text
                style={[
                  styles.dayText,

                  selectedDate === item.date &&
                    styles.selectedDayText,
                ]}
              >
                {item.day}
              </Text>


              {plannedOutfits[item.date] && (

                <View style={styles.dot} />

              )}

            </TouchableOpacity>

          ))}

        </View>


        {/* SELECTED DATE */}

        {selectedDate && (

          <View style={styles.selectedCard}>

            <Text style={styles.selectedTitle}>
              Selected Date
            </Text>

            <Text style={styles.selectedDate}>
              {selectedDate}
            </Text>


            {currentOutfit ? (

              <View>

                <Text style={styles.outfitLabel}>
                  Planned Outfit
                </Text>

                <Text style={styles.outfitName}>
                  {currentOutfit}
                </Text>


                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={deleteOutfit}
                >

                  <Text style={styles.deleteText}>
                    Delete Plan
                  </Text>

                </TouchableOpacity>

              </View>

            ) : (

              <View>

                <Text style={styles.noOutfit}>
                  No outfit planned for this day.
                </Text>

                <TouchableOpacity
                  style={styles.planButton}
                  onPress={planOutfit}
                >

                  <Text style={styles.planButtonText}>
                    Plan Outfit
                  </Text>

                </TouchableOpacity>

              </View>

            )}

          </View>

        )}


        {/* ALL PLANS */}

        <Text style={styles.sectionTitle}>
          Planned Outfits
        </Text>


        {Object.keys(plannedOutfits).length === 0 ? (

          <View style={styles.emptyCard}>

            <Text style={styles.emptyTitle}>
              No outfits planned
            </Text>

            <Text style={styles.emptyText}>
              Select a date and plan an outfit.
            </Text>

          </View>

        ) : (

          Object.keys(plannedOutfits).map((date) => (

            <TouchableOpacity
              key={date}
              style={styles.planCard}
              onPress={() => setSelectedDate(date)}
            >

              <View>

                <Text style={styles.planDate}>
                  {date}
                </Text>

                <Text style={styles.planOutfit}>
                  {plannedOutfits[date]}
                </Text>

              </View>

            </TouchableOpacity>

          ))

        )}

      </ScrollView>

    </View>

  );
}


// =================================================
// STYLES
// =================================================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f8f3f0',
  },

  content: {
    padding: 20,
    paddingTop: 45,
    paddingBottom: 40,
  },

  backButton: {
    marginBottom: 20,
  },

  backText: {
    fontSize: 16,
    color: '#0d0101',
    fontWeight: 'bold',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0d0101',
  },

  subtitle: {
    fontSize: 14,
    color: '#777',
    marginTop: 6,
    marginBottom: 25,
  },

  monthHeader: {
    backgroundColor: '#0d0101',
    borderRadius: 18,
    padding: 18,
    alignItems: 'center',
    marginBottom: 15,
  },

  monthTitle: {
    color: '#ffffff',
    fontSize: 19,
    fontWeight: 'bold',
  },

  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 4,
  },

  weekText: {
    width: '13%',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#777',
  },

  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 10,
  },

  dayButton: {
    width: '14.28%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 4,
  },

  selectedDay: {
    backgroundColor: '#0d0101',
  },

  plannedDay: {
    borderWidth: 2,
    borderColor: '#ead9cc',
  },

  dayText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },

  selectedDayText: {
    color: '#ffffff',
  },

  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#0d0101',
    marginTop: 3,
  },

  selectedCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
  },

  selectedTitle: {
    fontSize: 14,
    color: '#777',
  },

  selectedDate: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0d0101',
    marginTop: 5,
    marginBottom: 15,
  },

  outfitLabel: {
    fontSize: 13,
    color: '#777',
  },

  outfitName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0d0101',
    marginTop: 5,
  },

  noOutfit: {
    fontSize: 14,
    color: '#777',
    marginBottom: 15,
  },

  planButton: {
    backgroundColor: '#0d0101',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
  },

  planButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
  },

  deleteButton: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#0d0101',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },

  deleteText: {
    color: '#0d0101',
    fontWeight: 'bold',
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0d0101',
    marginTop: 30,
    marginBottom: 15,
  },

  emptyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0d0101',
  },

  emptyText: {
    fontSize: 13,
    color: '#777',
    marginTop: 5,
  },

  planCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 18,
    marginBottom: 12,
  },

  planDate: {
    fontSize: 13,
    color: '#777',
  },

  planOutfit: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#0d0101',
    marginTop: 5,
  },

});