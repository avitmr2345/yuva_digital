import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import {
  ArrowUpRight,
  Carrot,
  Clock,
  House,
  MapPin,
  Microscope,
  PillBottle,
  ShoppingBag,
  ShoppingCart,
  Stethoscope,
  UtensilsCrossed,
  UserRound,
} from "lucide-react-native";
import type { ComponentType } from "react";
import { useMemo, useState } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { homeBackground } from "../theme/colors";

const DESIGN_WIDTH = 402;
const GUTTER = 24;
const CARD_WIDTH = DESIGN_WIDTH - GUTTER * 2;

const assets = {
  avatar:
    "https://www.figma.com/api/mcp/asset/3c4a9f06-f616-4078-ad5d-c579e4979395",
  coinOuter:
    "https://www.figma.com/api/mcp/asset/96efaf9a-93ae-494c-98aa-0bceb85041b0",
  coinInner:
    "https://www.figma.com/api/mcp/asset/5564de11-c80e-4bee-bbfc-e7bbbcc3f141",
  heroDoctor:
    "https://www.figma.com/api/mcp/asset/bbd65457-c3a0-4a19-a330-48172a2adb80",
};

type ServiceId = "opd" | "diagnostics" | "pharmacy" | "diet_plans";

const services = [
  {
    id: "opd",
    Icon: Stethoscope,
    label: "OPD Consultation",
    size: 19,
  },
  {
    id: "diagnostics",
    Icon: Microscope,
    label: "Diagnostics",
    size: 23,
  },
  {
    id: "pharmacy",
    Icon: PillBottle,
    label: "Pharmacy",
    size: 22,
  },
  {
    id: "diet_plans",
    Icon: Carrot,
    label: "Diet Plans",
    size: 22,
  },
] as const satisfies ReadonlyArray<{
  id: ServiceId;
  Icon: ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
  label: string;
  size: number;
}>;

const tabs = [
  { Icon: House },
  { Icon: Stethoscope },
  { Icon: ShoppingBag },
  { Icon: UserRound },
] as const;

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const bottomNavBottom = Math.max(14, insets.bottom + 8);
  const bg = homeBackground;
  const [activeService, setActiveService] = useState<ServiceId>("opd");
  const [activeDiagnostic, setActiveDiagnostic] = useState<string>("Complete Blood Count");
  const [cart, setCart] = useState<Record<string, boolean>>({});

  const diagnostics = useMemo(
    () => [
      {
        title: "Complete Blood Count",
        subtitle: "Hemoglobin, RBC, WBC, Platelets",
        price: 299,
        mrp: 399,
        reportTime: "6 hrs",
        fasting: "No fasting required",
        tag: "CBC",
      },
      {
        title: "Thyroid Profile",
        subtitle: "TSH, T3, T4",
        price: 499,
        mrp: 699,
        reportTime: "8 hrs",
        fasting: "No fasting required",
        tag: "Thyroid",
      },
      {
        title: "Lipid Profile",
        subtitle: "Cholesterol, HDL, LDL, Triglycerides",
        price: 599,
        mrp: 799,
        reportTime: "12 hrs",
        fasting: "Fasting 10-12 hrs",
        tag: "Heart",
      },
      {
        title: "Liver Function Test",
        subtitle: "SGOT, SGPT, Bilirubin",
        price: 549,
        mrp: 749,
        reportTime: "10 hrs",
        fasting: "No fasting required",
        tag: "LFT",
      },
      {
        title: "Blood Sugar (Fasting)",
        subtitle: "Glucose level",
        price: 149,
        mrp: 199,
        reportTime: "2 hrs",
        fasting: "Fasting 8 hrs",
        tag: "Sugar",
      },
      {
        title: "Vitamin D",
        subtitle: "25(OH) Vitamin D",
        price: 799,
        mrp: 999,
        reportTime: "24 hrs",
        fasting: "No fasting required",
        tag: "Vitamins",
      },
    ],
    [],
  );

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <View pointerEvents="none" style={styles.homeVectorContainer}>
        <View style={styles.homeVectorBase} />
        <LinearGradient
          colors={bg.overlay.colors as [string, string, ...string[]]}
          locations={bg.overlay.locations as [number, number, ...number[]]}
          start={bg.overlay.start}
          end={bg.overlay.end}
          style={styles.homeVectorGradient}
        />
      </View>

      <StatusBar style="dark" />

      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: bottomNavBottom + 63 + 24 },
        ]}
      >
        <View style={styles.locationRow}>
          <View style={styles.locationGroup}>
            <MapPin size={24} color="#ffffff" strokeWidth={2} />
            <View>
              <Text style={styles.locationTitle}>YUVA Health</Text>
              <Text style={styles.locationSubtitle}>Netaji Subhash Place</Text>
            </View>
          </View>
          <Image source={{ uri: assets.avatar }} style={styles.avatar} />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.carousel}
          contentContainerStyle={styles.carouselContent}
        >
          <View style={styles.walletCard}>
            <View style={styles.walletHeader}>
              <Text style={styles.walletHeading}>
                YUVA Health Digital Wallet
              </Text>
              <View style={styles.walletArrowPill}>
                <ArrowUpRight size={14} color="#ffffff" strokeWidth={2.6} />
              </View>
            </View>

            <View style={styles.walletBottom}>
              <View>
                <Text style={styles.walletLabel}>Available amount</Text>
                <View style={styles.amountRow}>
                  <View style={styles.coinWrap}>
                    <Image
                      source={{ uri: assets.coinOuter }}
                      style={styles.coinOuter}
                    />
                    <Image
                      source={{ uri: assets.coinInner }}
                      style={styles.coinInner}
                    />
                  </View>
                  <Text style={styles.amountText}>500</Text>
                </View>
              </View>

              <Pressable style={styles.addCoinsButton}>
                <Text style={styles.addCoinsText}>Add Coins</Text>
                <View style={styles.addCoinsIconWrap}>
                  <ArrowUpRight size={14} color="#053046" strokeWidth={2.6} />
                </View>
              </Pressable>
            </View>
          </View>

          <LinearGradient
            colors={["#5E7D90", "#45687D", "#2B4F62", "#184054", "#053046"]}
            start={{ x: 0.02, y: 0.05 }}
            end={{ x: 0.98, y: 0.95 }}
            style={styles.promoCard}
          >
            <Image
              source={{ uri: assets.heroDoctor }}
              style={styles.promoDoctor}
            />
            <View style={styles.promoTextWrap}>
              <Text style={styles.promoTitle}>Your Health, Our Priority</Text>
              <Text style={styles.promoBody}>
                Easy OPD consultations with experienced doctors - in-person,
                video, or call.
              </Text>
            </View>
            <Pressable style={styles.bookNowButtonCompact}>
              <Text style={styles.bookNowText}>Book Now</Text>
              <ArrowUpRight size={18} color="#053046" strokeWidth={2.3} />
            </Pressable>
          </LinearGradient>
        </ScrollView>

        <Text style={styles.noteText}>
          Note: All credits are valid only for 30 days either used or unused.
        </Text>

        <Text style={styles.sectionTitle}>Services</Text>

        <View style={styles.servicesRow}>
          {services.map((service) => {
            const isActive = service.id === activeService;
            return (
              <Pressable
                key={service.id}
                onPress={() => {
                  setActiveService(service.id);
                }}
                style={({ pressed }) => [
                  isActive
                    ? styles.serviceChipActive
                    : styles.serviceChipInactive,
                  pressed && styles.chipPressed,
                ]}
                hitSlop={8}
              >
                <View style={styles.serviceIconCircle}>
                  <service.Icon
                    size={service.size}
                    color="#053046"
                    strokeWidth={2.1}
                  />
                </View>
                {isActive && (
                  <Text style={styles.serviceChipLabel}>{service.label}</Text>
                )}
              </Pressable>
            );
          })}
        </View>

        {activeService === "diagnostics" ? (
          <View style={styles.diagnosticsMaskGroup}>
            <View style={styles.diagnosticsHeader}>
              <Text style={styles.diagnosticsHeaderTitle}>Diagnostics</Text>
              <Text style={styles.diagnosticsHeaderHint}>
                Select a test to view details
              </Text>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.diagnosticsList}
            >
              {diagnostics.map((item) => {
                const isActive = item.title === activeDiagnostic;
                const inCart = !!cart[item.title];
                return (
                  <View key={item.title} style={[styles.diagnosticsCard, isActive && styles.diagnosticsCardActive]}>
                    <Pressable
                      onPress={() => setActiveDiagnostic(item.title)}
                      style={({ pressed }) => [
                        styles.diagnosticsCardMain,
                        pressed && styles.diagnosticsCardPressed,
                      ]}
                    >
                      <View style={styles.diagnosticsIconBadge}>
                        <Text style={styles.diagnosticsIconText}>{item.tag}</Text>
                      </View>

                      <View style={styles.diagnosticsRowText}>
                        <Text
                          numberOfLines={1}
                          style={[
                            styles.diagnosticsRowTitle,
                            isActive && styles.diagnosticsRowTitleActive,
                          ]}
                        >
                          {item.title}
                        </Text>
                        <Text
                          numberOfLines={1}
                          style={[
                            styles.diagnosticsRowSubtitle,
                            isActive && styles.diagnosticsRowSubtitleActive,
                          ]}
                        >
                          {item.subtitle}
                        </Text>

                        <View style={styles.diagnosticsMetaRow}>
                          <View style={styles.diagnosticsMetaPill}>
                            <UtensilsCrossed size={14} color="#053046" strokeWidth={2} />
                            <Text style={styles.diagnosticsMetaText} numberOfLines={1}>
                              {item.fasting}
                            </Text>
                          </View>
                          <View style={styles.diagnosticsMetaPill}>
                            <Clock size={14} color="#053046" strokeWidth={2} />
                            <Text style={styles.diagnosticsMetaText}>
                              Reports in {item.reportTime}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </Pressable>

                    <View style={styles.diagnosticsRight}>
                      <View style={styles.diagnosticsPriceBlock}>
                        <Text style={styles.diagnosticsPrice}>₹{item.price}</Text>
                        <Text style={styles.diagnosticsMrp}>₹{item.mrp}</Text>
                      </View>
                      <Pressable
                        onPress={() =>
                          setCart((prev) => ({ ...prev, [item.title]: !prev[item.title] }))
                        }
                        style={({ pressed }) => [
                          inCart ? styles.addCartButtonActive : styles.addCartButton,
                          pressed && styles.addCartButtonPressed,
                        ]}
                      >
                        <ShoppingCart size={16} color={inCart ? "#ffffff" : "#053046"} strokeWidth={2.2} />
                        <Text style={inCart ? styles.addCartTextActive : styles.addCartText}>
                          {inCart ? "Added" : "Add to cart"}
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        ) : (
          <LinearGradient
            colors={["#5E7D90", "#45687D", "#2B4F62", "#184054", "#053046"]}
            start={{ x: 0.03, y: 0.08 }}
            end={{ x: 0.97, y: 0.94 }}
            style={styles.heroCard}
          >
            <Image source={{ uri: assets.heroDoctor }} style={styles.heroDoctor} />

            <View style={styles.heroTextBlock}>
              {activeService === "opd" && (
                <>
                  <Text style={styles.heroHeading}>Consult{"\n"}Without Limits</Text>
                  <Text style={styles.heroDescription}>
                    Choose how you connect - Cashless OPD, Audio, Video, or Direct
                    Doctor Visits.
                  </Text>
                </>
              )}

              {activeService === "pharmacy" && (
                <>
                  <Text style={styles.heroHeading}>Pharmacy</Text>
                  <Text style={styles.heroDescription}>
                    Pharmacy content goes here (Figma node `530:3565`).
                  </Text>
                </>
              )}

              {activeService === "diet_plans" && (
                <>
                  <Text style={styles.heroHeading}>Diet Plans</Text>
                  <Text style={styles.heroDescription}>
                    Diet plan content goes here (Figma node `535:1593`).
                  </Text>
                </>
              )}
            </View>

            <Pressable style={styles.bookNowButton}>
              <Text style={styles.bookNowText}>Book Now</Text>
              <ArrowUpRight size={18} color="#053046" strokeWidth={2.3} />
            </Pressable>
          </LinearGradient>
        )}

        <Pressable>
          <Text style={styles.viewAllText}>View all Features</Text>
        </Pressable>
      </ScrollView>

      <View style={[styles.bottomNavShell, { bottom: bottomNavBottom }]}>
        <View style={styles.bottomNavRow}>
          {tabs.map((tab, index) => (
            <Pressable
              key={`tab-${index}`}
              style={index === 0 ? styles.activeTab : styles.inactiveTab}
            >
              <tab.Icon
                size={24}
                color={index === 0 ? "#121212" : "#1A3441"}
                strokeWidth={2}
              />
            </Pressable>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: homeBackground.baseColor,
  },
  scrollContent: {
    paddingTop: 6,
    paddingHorizontal: GUTTER,
  },
  homeVectorContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
  },
  homeVectorBase: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: homeBackground.baseColor,
  },
  homeVectorGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  locationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
  },
  locationGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  locationTitle: {
    color: "#ffffff",
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "600",
  },
  locationSubtitle: {
    color: "#ffffff",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "300",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  carousel: {
    marginTop: 18,
    marginHorizontal: -GUTTER,
  },
  carouselContent: {
    paddingLeft: GUTTER,
    paddingRight: GUTTER,
    gap: 16,
    alignItems: "center",
  },
  walletCard: {
    width: CARD_WIDTH,
    borderRadius: 36,
    backgroundColor: "rgba(205,214,218,0.2)",
    padding: 18,
    gap: 28,
  },
  walletHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  walletHeading: {
    color: "#f6f8f9",
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 19,
  },
  walletArrowPill: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#053046",
    justifyContent: "center",
    alignItems: "center",
  },
  walletBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: 18,
  },
  walletLabel: {
    color: "#f6f8f9",
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "600",
  },
  amountRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
    gap: 6,
  },
  coinWrap: {
    width: 37,
    height: 37,
    justifyContent: "center",
    alignItems: "center",
  },
  coinOuter: {
    width: 37,
    height: 37,
  },
  coinInner: {
    position: "absolute",
    width: 17.2,
    height: 17.2,
  },
  amountText: {
    color: "#f6f8f9",
    fontSize: 50,
    lineHeight: 50,
    fontWeight: "600",
  },
  addCoinsButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    backgroundColor: "#053046",
    borderRadius: 35,
    paddingHorizontal: 7,
    paddingVertical: 7,
  },
  addCoinsText: {
    width: 65,
    textAlign: "center",
    color: "#ffffff",
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "600",
  },
  addCoinsIconWrap: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  promoCard: {
    width: CARD_WIDTH,
    height: 157,
    borderRadius: 36,
    overflow: "hidden",
  },
  promoDoctor: {
    position: "absolute",
    width: 230,
    height: 230,
    right: -58,
    top: -10,
  },
  promoTextWrap: {
    position: "absolute",
    top: 26,
    left: 23,
    width: 240,
  },
  promoTitle: {
    color: "#ffffff",
    fontSize: 20,
    lineHeight: 27,
    fontWeight: "600",
  },
  promoBody: {
    marginTop: 1,
    color: "#ffffff",
    fontSize: 10,
    lineHeight: 14,
    fontWeight: "600",
  },
  bookNowButtonCompact: {
    position: "absolute",
    left: 23,
    top: 101,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    borderRadius: 35,
    backgroundColor: "#ffffff",
    paddingHorizontal: 3,
    paddingVertical: 3,
  },
  bookNowButton: {
    position: "absolute",
    left: 20,
    top: 166,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    borderRadius: 35,
    backgroundColor: "#ffffff",
    paddingHorizontal: 3,
    paddingVertical: 3,
  },
  bookNowText: {
    width: 63.2,
    textAlign: "right",
    color: "#053046",
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "600",
  },
  noteText: {
    marginTop: 9,
    color: "#000000",
    fontSize: 10,
    lineHeight: 14,
    alignSelf: "center",
  },
  sectionTitle: {
    marginTop: 11,
    color: "#000000",
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "600",
  },
  servicesRow: {
    marginTop: 11,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  serviceChipActive: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 52,
    backgroundColor: "#053046",
    paddingLeft: 5,
    paddingRight: 15,
    paddingVertical: 5,
  },
  serviceChipInactive: {
    backgroundColor: "#053046",
    borderRadius: 52,
    padding: 1,
  },
  serviceIconCircle: {
    width: 44.526,
    height: 44.526,
    borderRadius: 38.165,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  serviceChipLabel: {
    color: "#ffffff",
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "600",
  },
  chipPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
  diagnosticsMaskGroup: {
    marginTop: 11,
    width: CARD_WIDTH,
    height: 676.81,
    borderRadius: 40,
    overflow: "hidden",
    backgroundColor: "rgba(5,48,70,0.14)",
    borderWidth: 1,
    borderColor: "rgba(5,48,70,0.25)",
    padding: 20,
    justifyContent: "flex-start",
  },
  diagnosticsHeader: {
    paddingBottom: 12,
  },
  diagnosticsHeaderTitle: {
    color: "#053046",
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
  diagnosticsHeaderHint: {
    marginTop: 4,
    color: "rgba(5,48,70,0.75)",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
  },
  diagnosticsList: {
    flex: 1,
    gap: 12,
    paddingBottom: 6,
  },
  diagnosticsCard: {
    flexDirection: "row",
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.52)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.55)",
  },
  diagnosticsCardActive: {
    backgroundColor: "rgba(255,255,255,0.70)",
    borderColor: "rgba(5,48,70,0.16)",
  },
  diagnosticsCardPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.99 }],
  },
  diagnosticsCardMain: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  diagnosticsIconBadge: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "rgba(5,48,70,0.10)",
    borderWidth: 1,
    borderColor: "rgba(5,48,70,0.16)",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  diagnosticsIconText: {
    color: "#053046",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.4,
  },
  diagnosticsRowText: {
    flex: 1,
  },
  diagnosticsRowTitle: {
    color: "#053046",
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "800",
  },
  diagnosticsRowTitleActive: {
    color: "#053046",
  },
  diagnosticsRowSubtitle: {
    marginTop: 2,
    color: "rgba(5,48,70,0.75)",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
  },
  diagnosticsRowSubtitleActive: {
    color: "rgba(5,48,70,0.82)",
  },
  diagnosticsMetaRow: {
    marginTop: 10,
    gap: 8,
  },
  diagnosticsMetaPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "flex-start",
    borderRadius: 999,
    backgroundColor: "rgba(205,214,218,0.55)",
    borderWidth: 1,
    borderColor: "rgba(5,48,70,0.10)",
    paddingHorizontal: 10,
    paddingVertical: 7,
    maxWidth: 210,
  },
  diagnosticsMetaText: {
    color: "rgba(5,48,70,0.92)",
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "700",
  },
  diagnosticsRight: {
    width: 110,
    paddingVertical: 14,
    paddingRight: 12,
    paddingLeft: 0,
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  diagnosticsPriceBlock: {
    alignItems: "flex-end",
  },
  diagnosticsPrice: {
    color: "#053046",
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "900",
  },
  diagnosticsMrp: {
    marginTop: 2,
    color: "rgba(5,48,70,0.55)",
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "700",
    textDecorationLine: "line-through",
  },
  addCartButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.82)",
    borderWidth: 1,
    borderColor: "rgba(5,48,70,0.18)",
    paddingHorizontal: 10,
    paddingVertical: 9,
  },
  addCartButtonActive: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    borderRadius: 999,
    backgroundColor: "#053046",
    borderWidth: 1,
    borderColor: "rgba(5,48,70,0.22)",
    paddingHorizontal: 10,
    paddingVertical: 9,
  },
  addCartButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  addCartText: {
    color: "#053046",
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "800",
  },
  addCartTextActive: {
    color: "#ffffff",
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "800",
  },
  heroCard: {
    marginTop: 11,
    width: CARD_WIDTH,
    height: 298,
    borderRadius: 40,
    overflow: "hidden",
  },
  heroDoctor: {
    position: "absolute",
    width: 351.79,
    height: 351.79,
    right: -118,
    top: -10,
  },
  heroTextBlock: {
    position: "absolute",
    left: 20,
    top: 34,
    width: 213,
  },
  heroHeading: {
    color: "#ffffff",
    fontSize: 30,
    lineHeight: 41,
    fontWeight: "600",
  },
  heroDescription: {
    marginTop: 1,
    color: "#ffffff",
    fontSize: 12,
    lineHeight: 16,
    width: 213,
  },
  viewAllText: {
    marginTop: 8,
    marginBottom: 14,
    alignSelf: "center",
    color: "#053046",
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "600",
  },
  bottomNavShell: {
    position: "absolute",
    left: (DESIGN_WIDTH - 280) / 2,
    right: (DESIGN_WIDTH - 280) / 2,
    height: 63,
    borderRadius: 425,
    backgroundColor: "#cdd6da",
    justifyContent: "center",
  },
  bottomNavRow: {
    height: 56,
    marginHorizontal: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  activeTab: {
    width: 55,
    height: 56,
    borderRadius: 215,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  inactiveTab: {
    width: 55,
    height: 56,
    borderRadius: 215,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
});
