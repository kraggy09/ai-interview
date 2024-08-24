import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Svg,
  Line,
} from "@react-pdf/renderer";

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 20,
    backgroundColor: "#ffffff",
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: "bold",
  },
  progressContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  progressText: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
});

// Create Document Component
const ReportCard = ({ data }) => {
  const percentage = data.percentage || 50; // Assuming `percentage` is given in data
  const totalWidth = 200; // Width of the total progress bar
  const progressWidth = (percentage / 100) * totalWidth; // Calculated width based on percentage

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Report Card</Text>
          <View style={styles.progressContainer}>
            <Svg height="40" width={totalWidth}>
              {/* Background line */}
              <Line
                x1="0"
                y1="20"
                x2={totalWidth}
                y2="20"
                stroke="#e0e0e0"
                strokeWidth="10"
              />
              {/* Progress line */}
              <Line
                x1="0"
                y1="20"
                x2={progressWidth}
                y2="20"
                stroke="blue"
                strokeWidth="10"
              />
            </Svg>
            <Text style={styles.progressText}>{percentage}%</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ReportCard;
