import mongodb from 'mongodb';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const ObjectId = mongodb.ObjectId;
const config = require(`../config/config.${process.env.NODE_ENV}.json`);
const mongoDBConfig = config.dbConfig;
const replica = mongoDBConfig.replica || "";
const options = {};

if (replica) {
    options.replicaSet = replica;
}

const mongoClient = new mongodb.MongoClient(mongoDBConfig.url, options);
let client;
//Cache the mongodb connection
const dbCache = {};

const connectPromise = async function () {
    try {
        client = await mongoClient.connect();
        dbCache.db = client.db(mongoDBConfig.db);
        console.log(`Connection with mongodb successful ${new Date()}`);
        return Promise.resolve(true);
    }
    catch (error) {
        console.log(`Error while connecting to Mongo DB ${error}`);
        return Promise.reject(error);
    }
};

const getDb = function () {
    return dbCache.db;
};

function getNewObjectId() {
    return new mongodb.ObjectId();
}

function getObjectId(id) {
    if (id instanceof mongodb.ObjectId) {
        return id;
    }
    return mongodb.ObjectId.createFromHexString(id);
}

function toObjectId(objectIds) {
    return objectIds.map(id => getObjectId(id));
}


export { connectPromise as connectPromise };
export { getDb as getDb };
export { client as client };
export { ObjectId as ObjectId };
export { getNewObjectId as getNewObjectId };
export { getObjectId as getObjectId };
export { toObjectId as toObjectId };