<template>
    <div><SideBar2 /></div>
    <!-- View Conditionally renders customer or interior designer components
    for viewing customer profile or interior designer portfolio.
    Determines whether user type data from mounting is customer or interior designer -->
    <div v-if="usertype == 'Customer'"><DisplayCustomer /></div>
    <div v-else-if="usertype == 'Interior Designer'"><DisplayID /></div>
</template>

<script>
    import { getDoc, doc } from "@firebase/firestore";
    import firebaseApp from "../firebase";
    import { getAuth, onAuthStateChanged } from "@firebase/auth";
    import { getFirestore } from "@firebase/firestore";
    import DisplayCustomer from "../components/DisplayCustomer.vue";
    import DisplayID from "../components/DisplayID.vue";
    import SideBar2 from "../components/SideBar2.vue";

    export default {
        components: { SideBar2, DisplayCustomer, DisplayID },
        created: function () {
            document.body.style.backgroundColor = "#c6eeec";
        },
        destroyed: function () {
            document.body.style.backgroundColor = null;
        },
        data() {
            return {
                name: "",
                usertype: "",
                services: [],
                email: "",
                contact: "",
                dataLoaded: false,
            };
        },
        methods: {
            // Uses firebase method to take document snapshot of uid document
            async getUserData(docRef) {
                const docSnap = await getDoc(docRef);
                return docSnap;
            },
            editDetails() {
                this.$router.push("profile/edit");
            },
            goReview() {
                this.$router.push("/review");
            },
            goRequests() {
                this.$router.push("/profile/jobrequest");
            },
        },
        beforeMount() {
            // Before Mounting, website retrieves user authentication data from Firestore firebase
            // to populate the user data for data prop. Used to conditionally render ID or customer view
            const auth = getAuth();
            // auth state listener to know if authentication changes and so that uid wont be undefined
            onAuthStateChanged(auth, (user) => {
                const uid = user.uid;
                const db = getFirestore(firebaseApp);
                const docRef = doc(db, "users", uid);
                const docSnap = this.getUserData(docRef);
                docSnap.then((data) => {
                    console.log(data.data());
                    this.name = data.data().name;
                    this.usertype = data.data().usertype;
                    this.email = data.data().email;
                    this.contact = data.data().contact;
                    this.services = data.data().Services;
                    this.dataLoaded = true;
                });
                console.log(" User Type Test");
            });
        },
        unmounted() {
            console.log("unmounted");
        },
    };
</script>
