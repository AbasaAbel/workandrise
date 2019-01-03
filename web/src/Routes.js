import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppliedRoute from './components/AppliedRoute';
import Home from './home/Home';
import Profile from './profile/Profile';
import EditProfile from './auth/EditProfile';
import EditSkills from './profile/EditSkills';
import NewProfile from './auth/NewProfile';
import ViewProfile from './profile/ViewProfile';
import UploadPicture from './profile/UploadPicture';
import ApplicationList from './applications/ApplicationList';
import NewJob from './jobs/NewJob';
import Jobs from './jobs/Jobs';
import Search from './jobs/SearchJobs';
import Login from './auth/Login';
import Signup from './auth/Signup';
import Applications from './applications/Applications';
import Transactions from './transactions/Transactions';
import NewApplication from './applications/NewApplication';
import EditApplication from './applications/EditApplication';
import Transaction from './transactions/Transaction';
import Application from './applications/Application';
import Messages from './messaging/Messages';
import Project from './projects/Project';
import ResetPassword from './auth/ResetPassword';
import Sandbox from './components/Sandbox';
import Sandbox2 from './components/Sandbox2';
import AddReview from './reviews/AddReview';
import NotFound from './components/NotFound';
import GraduateProfile from './auth/GraduateRegistration';
import SelectedContacts  from  './contacts/selectedContacts';

export default ({ childProps }) => (
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <AppliedRoute path="/profile" exact component={Profile} props={childProps} />
    <AppliedRoute path="/profile/new" exact component={NewProfile} props={childProps} />
    <AppliedRoute path="/profile/edit" exact component={EditProfile} props={childProps} />
    <AppliedRoute path="/profile/picture" exact component={UploadPicture} props={childProps} />
    <AppliedRoute path="/profile/skills" exact component={EditSkills} props={childProps} />
    <AppliedRoute path="/profile/:id" exact component={ViewProfile} props={childProps} />
    <AppliedRoute path="/transactions" exact component={Transactions} props={childProps} />
    <AppliedRoute path="/transactions/:transactionId" exact component={Transaction} props={childProps} />
    <AppliedRoute path="/apps" exact component={Applications} props={childProps} />
    <AppliedRoute path="/apps/:appId" exact component={EditApplication} props={childProps} />
    <AppliedRoute path="/jobs" exact component={Jobs} props={childProps} />
    <AppliedRoute path="/jobs/create" exact component={NewJob} props={childProps} />
    <AppliedRoute path="/jobs/:jobId" exact component={ApplicationList} props={childProps} />
    <AppliedRoute path="/jobs/:jobId/apps" exact component={NewApplication} props={childProps} />
    <AppliedRoute path="/jobs/:jobId/apps/:jobAppId" exact component={Application} props={childProps} />
    <AppliedRoute path="/messages/:threadId" exact component={Messages} props={childProps} />
    <AppliedRoute path="/projects/:id" exact component={Project} props={childProps} />
    <AppliedRoute path="/sandbox" exact component={Sandbox} props={childProps} />
    <AppliedRoute path="/review" exact component={AddReview} props={childProps} />
    <AppliedRoute path="/reset" exact component={ResetPassword} props={childProps} />
    <AppliedRoute path="/login" exact component={Login} props={childProps} />
    <AppliedRoute path="/signup" exact component={Signup} props={childProps} />
    <AppliedRoute path="/newsandbox" exact component={Sandbox2} props={childProps} />
    <AppliedRoute path="/profile/graduate" exact component={GraduateProfile} props={childProps} />
    <AppliedRoute path="/search" exact component={Search} props={childProps} />
    <AppliedRoute path="/selected-contacts" exact component={SelectedContacts} props={childProps} />
    <Route component={NotFound} />

  </Switch>
);
